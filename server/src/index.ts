import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import submissionRoutes from './routes/submissionRoutes'; 
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Kulu AI Platform API',
    version: '1.0.0',
    description: 'API documentation',
  },
  servers: [
    { url: `http://localhost:${process.env.PORT || 5000}` }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: 'Auth', description: 'User authentication' },
    { name: 'Tasks', description: 'Task management' },
    { name: 'Submissions', description: 'Work submissions' }
  ],
  
  
  paths: {
    
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', enum: ['ADMIN', 'TRANSLATOR'] }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'User created' }
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' }
        }
      }
    },
    '/api/auth/profile': {
      get: {
        tags: ['Auth'],
        summary: 'Get user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Profile data' }
        }
      }
    },

    
    '/api/tasks': {
      post: {
        tags: ['Tasks'],
        summary: 'Create Task (Admin)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  type: { type: 'string' },
                  instruction: { type: 'string' }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'Created' } }
      }
    },
    '/api/tasks/available': {
      get: {
        tags: ['Tasks'],
        summary: 'Get available tasks',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'List of tasks' } }
      }
    },

    
    '/api/submissions/{taskId}': {
      post: {
        tags: ['Submissions'],
        summary: 'Submit work for a task',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'taskId',
            schema: { type: 'string' },
            required: true,
            description: 'The ID of the task being submitted'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  content: { type: 'string', description: 'The translated text or file URL' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Work submitted successfully' },
          404: { description: 'Task not found' }
        }
      }
    },
    '/api/submissions/my': {
      get: {
        tags: ['Submissions'],
        summary: 'Get my submission history',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of my submissions' }
        }
      }
    }
  } 
};

const options = {
  swaggerDefinition,
  apis: [], 
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/submissions', submissionRoutes); 

app.get('/', (req, res) => {
  res.send('Kulu API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/swagger`);
});