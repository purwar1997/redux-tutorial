import seedrandom from 'seedrandom';
import { factory, primaryKey, oneOf, manyOf } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { http, delay, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

const NUM_USERS = 5;
const POSTS_PER_USER = 3;
const RECENT_NOTIFICATIONS_DAYS = 7;
const RESPONSE_DELAY_MS = 2000;

const useSeededRNG = true;

// Initializing random number generator without a seed value. An unpredictable value will be returned everytime rng is
// invoked.
let rng = seedrandom();

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed');
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem('randomTimestampSeed', randomSeedString);
  }

  // Initializing random number generator with a timestamp seed value. A predictable value will be returned everytime
  // rng is invoked.
  rng = seedrandom(randomSeedString);

  // Pass a seed value to generate consistent results
  faker.seed(seedDate.getTime());
}

/* MSW data model setup */

const db = factory({
  user: {
    id: primaryKey(nanoid),
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    content: String,
    date: String,
    user: oneOf('user'),
    reactions: oneOf('reaction'),
    comments: manyOf('comment'),
  },
  comment: {
    id: primaryKey(String),
    text: String,
    date: String,
    post: oneOf('post'),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    wow: Number,
    heart: Number,
    rocket: Number,
    coffee: Number,
    post: oneOf('post'),
  },
});

const createUserData = () => {
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
  };
};

const createPostData = user => {
  return {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph({ min: 5, max: 8 }),
    date: faker.date.recent({ days: RECENT_NOTIFICATIONS_DAYS }).toISOString(),
    reactions: db.reaction.create(),
    user,
  };
};

// Create an initial set of users and posts
for (let i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData());

  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author);
    db.post.create(newPost);
  }
}

const serializePost = post => ({
  ...post,
  user: post.user.id,
});

/* MSW REST API handlers */

const handlers = [
  http.get('/api/posts', async () => {
    const posts = db.post.getAll().map(serializePost);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(posts, {
      status: 200,
      statusText: 'Posts successfully fetched',
    });
  }),

  http.post('/api/posts', async ({ request }) => {
    const data = await request.json();

    data.user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.reactions = db.reaction.create();
    data.date = new Date().toISOString();

    const post = db.post.create(data);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(post), {
      status: 201,
      statusText: 'Post successfully created',
    });
  }),

  http.get('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(post), {
      status: 200,
      statusText: 'Post successfully fetched',
    });
  }),

  http.put('/api/posts/:postId', async ({ request, params }) => {
    const data = await request.json();

    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    data.user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.date = new Date().toISOString();

    const updatedPost = db.post.update({ where: { id: { equals: postId } }, data });

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(updatedPost), {
      status: 200,
      statusText: 'Post successfully updated',
    });
  }),

  http.delete('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    const deletedPost = db.post.delete({ where: { id: { equals: postId } } });

    if (deletedPost) {
      db.reaction.delete({ where: { id: { equals: deletedPost.reactions.id } } });
    }

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(deletedPost), {
      status: 200,
      statusText: 'Post successfully deleted',
    });
  }),

  http.put('/api/posts/:postId/reactions', async ({ request, params }) => {
    const { reaction } = await request.json();
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Post not found',
      });
    }

    const updatedPost = db.post.update({
      where: {
        id: { equals: postId },
      },
      data: {
        reactions(prevReactions, post) {
          return db.reaction.update({
            where: {
              id: { equals: post.reactions.id },
            },
            data: {
              [reaction]: prevReactions[reaction] + 1,
            },
          });
        },
      },
    });

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(updatedPost), {
      status: 200,
      statusText: 'Reaction successfully added to post',
    });
  }),

  http.get('/api/users', async () => {
    const users = db.user.getAll();

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(users, {
      status: 200,
      statusText: 'Users successfully fetched',
    });
  }),
];

export const worker = setupWorker(...handlers);
