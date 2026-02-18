
import mongoose from 'mongoose';
import { SiteSettings, TeamMember, Service, Tool, Career } from '@/lib/models';
import connectToDatabase from '@/lib/db';
import * as dotenv from 'dotenv';
dotenv.config();

const servicesData = [
    {
        slug: 'software',
        title: 'Software',
        icon: 'Code',
        description:
            'We deliver top-tier software development services by blending extensive domain expertise with cutting-edge technology to build robust web apps and portals.',
        longDescription:
            'Our software development services are at the heart of what we do. We specialize in creating custom web applications, enterprise solutions, and mobile apps that are scalable, secure, and user-friendly. Our team of expert developers follows agile methodologies to ensure timely delivery and high-quality code. From initial concept to final deployment, we work closely with you to bring your vision to life.',
    },
    {
        slug: 'elearning',
        title: 'eLearning',
        icon: 'School',
        description:
            'Seeking premium quality eLearning solutions at pocket-friendly rates? We deliver custom courses, mobile learning, and more to meet your needs.',
        longDescription:
            'Transform your training and education programs with our innovative eLearning solutions. We design and develop engaging and interactive custom courses, Learning Management Systems (LMS), and mobile learning applications. Our instructional designers and multimedia experts collaborate to create content that is not only informative but also memorable and effective, ensuring your learners achieve their goals.',
    },
    {
        slug: 'multimedia',
        title: 'Multimedia',
        icon: 'Cuboid',
        description:
            'In this digital age, compelling multimedia is key. We create stunning 2D/3D animations, graphics, and UI/UX designs that captivate your audience.',
        longDescription:
            "Capture your audience's attention with stunning multimedia content. Our creative team produces high-quality 2D and 3D animations, motion graphics, and visual effects for a variety of platforms. We also specialize in UI/UX design, creating intuitive and beautiful interfaces that provide a seamless user experience. Let us help you tell your story in a visually compelling way.",
    },
    {
        slug: 'digital-marketing',
        title: 'Digital Marketing',
        icon: 'Megaphone',
        description:
            'The internet has firmly established itself as the future for all of us. We help you navigate it with SEO, social media, and content marketing strategies.',
        longDescription:
            "Navigate the digital landscape with our comprehensive marketing services. We develop and execute data-driven strategies for SEO, social media marketing, content marketing, and Pay-Per-Click (PPC) advertising. Our goal is to increase your online visibility, drive targeted traffic, and generate qualified leads that convert into loyal customers. Let's grow your brand together.",
    },
    {
        slug: 'qa-testing',
        title: 'QA/Testing',
        icon: 'CheckCircle',
        description:
            'Our final content delivery undergoes a rigorous quality assurance process to guarantee flawless performance, security, and user experience across all platforms.',
        longDescription:
            'Ensure your software is bug-free and performs flawlessly with our rigorous QA and testing services. We offer a full range of testing solutions, including manual and automated testing, performance testing, and security testing. Our meticulous approach guarantees that your application meets the highest standards of quality, reliability, and user experience before it reaches your customers.',
    },
    {
        slug: 'data-analysis',
        title: 'Data Analysis',
        icon: 'AreaChart',
        description:
            'Unlock actionable insights from your data with our advanced analytics, visualization, and business intelligence solutions.',
        longDescription:
            'Turn your data into a strategic asset with our advanced data analysis services. We help you collect, process, and analyze large datasets to uncover valuable insights that drive informed business decisions. Our expertise includes data visualization, business intelligence dashboards, and predictive analytics. Let us help you unlock the power of your data.',
    },
    {
        slug: 'cloud-devops',
        title: 'Cloud & DevOps',
        icon: 'Cloud',
        description:
            'Streamline your infrastructure and accelerate development with our expert cloud architecture and DevOps services.',
        longDescription:
            'Accelerate your development pipeline and improve your infrastructure with our cloud and DevOps services. We specialize in cloud architecture design, migration, and management on platforms like AWS, Azure, and Google Cloud. Our DevOps practices, including Continuous Integration and Continuous Delivery (CI/CD), help you release software faster and more reliably.',
    },
];

const teamData = [
    {
        name: "Anshuman",
        role: "CEO",
        bio: "Visionary Leader Driving The Company Towards New Frontiers Of Quality And Innovation.",
        imageUrl: "",
    },
    {
        name: "Anurag",
        role: "CFO",
        bio: "Financial Strategist Ensuring The Company's Sustainable Growth And Economic Stability.",
        imageUrl: "",
    },
];

const toolsData = [
    { name: "VS Code", imageUrl: "/images/tools/vscode.png" }, // Placeholders, real migration would need exact paths if they differ
    { name: "GitHub", imageUrl: "/images/tools/github.png" },
    { name: "React.js", imageUrl: "/images/tools/react.png" },
    { name: "Next.js", imageUrl: "/images/tools/nextjs.png" },
    { name: "Node.js", imageUrl: "/images/tools/nodejs.png" },
    // ... Simplified list for initial seed
];

const settingsData = {
    companyName: 'Xelaris',
    contactEmail: 'contact.xelaris@gmail.com',
    phoneNumber: '+91 9776198414',
    address: '89, Kulasukarpada, Cuttack, Odisha, India, 754209',
};


async function seed() {
    console.log('🌱 Seeding database...');
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data (Optional: remove if you want to invalid)
        // await Service.deleteMany({});
        // await TeamMember.deleteMany({});
        // await SiteSettings.deleteMany({});

        // --- Services ---
        const existingServices = await Service.find();
        if (existingServices.length === 0) {
            await Service.insertMany(servicesData);
            console.log('✅ Services seeded');
        } else {
            console.log('ℹ️ Services already exist, skipping.');
        }

        // --- Team ---
        const existingTeam = await TeamMember.find();
        if (existingTeam.length === 0) {
            await TeamMember.insertMany(teamData);
            console.log('✅ Team seeded');
        } else {
            console.log('ℹ️ Team already exists, skipping.');
        }

        // --- Settings ---
        const existingSettings = await SiteSettings.findOne();
        if (!existingSettings) {
            await SiteSettings.create(settingsData);
            console.log('✅ Settings seeded');
        } else {
            console.log('ℹ️ Settings already exist, skipping.');
        }

        // --- Tools ---
        // Simplified tools seed - ideally would map all from original array

        console.log('✅ Seeding completed.');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
