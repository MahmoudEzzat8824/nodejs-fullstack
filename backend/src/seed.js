const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/node-fullstack';

// Define the schema for taskmanager collection
const taskManagerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'taskmanager' });

const TaskManager = mongoose.model('TaskManager', taskManagerSchema);

// Sample data to populate the collection
const sampleTasks = [
  {
    title: 'Complete Project Documentation',
    description: 'Write comprehensive documentation for the Node.js fullstack project',
    status: 'in-progress',
    priority: 'high',
    category: 'Documentation',
    dueDate: new Date('2026-01-15')
  },
  {
    title: 'Fix Authentication Bug',
    description: 'Resolve the JWT token expiration issue in the authentication flow',
    status: 'pending',
    priority: 'high',
    category: 'Bug Fix',
    dueDate: new Date('2026-01-10')
  },
  {
    title: 'Implement Task Filters',
    description: 'Add filtering capabilities for tasks by status and priority',
    status: 'pending',
    priority: 'medium',
    category: 'Feature',
    dueDate: new Date('2026-01-20')
  },
  {
    title: 'Setup CI/CD Pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'pending',
    priority: 'medium',
    category: 'DevOps',
    dueDate: new Date('2026-01-25')
  },
  {
    title: 'Code Review',
    description: 'Review pull requests from team members',
    status: 'completed',
    priority: 'low',
    category: 'Review',
    dueDate: new Date('2026-01-05')
  },
  {
    title: 'Database Optimization',
    description: 'Add indexes to improve query performance',
    status: 'in-progress',
    priority: 'high',
    category: 'Performance',
    dueDate: new Date('2026-01-12')
  },
  {
    title: 'Update Dependencies',
    description: 'Update all npm packages to their latest versions',
    status: 'pending',
    priority: 'low',
    category: 'Maintenance',
    dueDate: new Date('2026-01-30')
  },
  {
    title: 'Create API Documentation',
    description: 'Document all API endpoints using Swagger',
    status: 'pending',
    priority: 'medium',
    category: 'Documentation',
    dueDate: new Date('2026-01-18')
  },
  {
    title: 'Add Unit Tests',
    description: 'Write unit tests for authentication and task controllers',
    status: 'in-progress',
    priority: 'high',
    category: 'Testing',
    dueDate: new Date('2026-01-14')
  },
  {
    title: 'UI Redesign',
    description: 'Redesign the dashboard with modern UI components',
    status: 'pending',
    priority: 'low',
    category: 'UI/UX',
    dueDate: new Date('2026-02-01')
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB');

    // Clear existing data in taskmanager collection
    await TaskManager.deleteMany({});
    console.log('✓ Cleared existing data from taskmanager collection');

    // Insert sample data
    const result = await TaskManager.insertMany(sampleTasks);
    console.log(`✓ Successfully inserted ${result.length} tasks into taskmanager collection`);

    // Display the inserted data
    console.log('\n📋 Inserted Tasks:');
    result.forEach((task, index) => {
      console.log(`\n${index + 1}. ${task.title}`);
      console.log(`   Description: ${task.description}`);
      console.log(`   Status: ${task.status}`);
      console.log(`   Priority: ${task.priority}`);
      console.log(`   Category: ${task.category}`);
      console.log(`   Due Date: ${task.dueDate.toLocaleDateString()}`);
    });

    // Verify the collection exists and count documents
    const count = await TaskManager.countDocuments();
    console.log(`\n✓ Total documents in taskmanager collection: ${count}`);

    // Close the connection
    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
    console.log('✅ Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
