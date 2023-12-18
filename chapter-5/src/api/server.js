import seedrandom from 'seedrandom';
import { factory, primaryKey, oneOf, manyOf } from '@mswjs/data';
import { nanoid } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { http, delay, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const NUM_USERS = 3;
const POSTS_PER_USER = 3;
const RECENT_NOTIFICATIONS_DAYS = 7;
const RESPONSE_DELAY_MS = 2000;

const useSeededRNG = true;

// Initializing random number generator without a seed value. An unpredictable value will be returned everytime random
// number generator is invoked.
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
  // random number generator is invoked.
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
    name: faker.person.fullname(),
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
for (const i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData());

  for (const j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author);
    db.post.create(newPost);
  }
}

const serializePost = post => ({
  ...post,
  user: post.user.id,
});

/* MSW REST API handlers */

export const handlers = [
  http.get('/api/posts', async () => {
    const posts = db.post.getAll().map(serializePost);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(posts, {
      status: 200,
    });
  }),

  http.post('/api/posts', async ({ request }) => {
    const data = request.json();

    data.user = db.user.findFirst({ where: { id: { equals: post.user } } });
    data.reactions = db.reaction.create();
    data.date = new Date().toISOString();

    const post = db.post.create(data);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(post), {
      status: 201,
    });
  }),

  http.get('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(post), {
      status: 200,
    });
  }),

  http.put('/api/posts/:postId', async ({ request, params }) => {
    const data = request.json();

    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    data.user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.date = new Date().toISOString();

    const updatedPost = db.post.update({ where: { id: { equals: postId } } }, data);

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(updatedPost), {
      status: 200,
    });
  }),

  http.delete('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    const deletedPost = db.post.delete({ where: { id: { equals: postId } } });

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(deletedPost), {
      status: 200,
    });
  }),

  http.put('/api/posts/:postId/reactions', async ({ request, params }) => {
    const { postId } = params;
    const { reaction } = request.json();

    const post = db.post.findFirst({ where: { id: { equals: postId } } });

    if (!post) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    const updatedPost = db.post.findFirst(
      { where: { id: { equals: postId } } },
      {
        reactions: {
          ...post.reactions,
          [reaction]: post.reactions[reaction] + 1,
        },
      }
    );

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(serializePost(updatedPost), {
      status: 200,
    });
  }),

  http.get('/api/users', async () => {
    const users = db.user.getAll();

    await delay(RESPONSE_DELAY_MS);

    return HttpResponse.json(users, {
      status: 200,
    });
  }),
];

export const server = setupServer(...handlers);