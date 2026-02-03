
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
            'We Deliver Top-Tier Software Development Services By Blending Extensive Domain Expertise With Cutting-Edge Technology To Build Robust Web Apps And Portals.',
        longDescription:
            'Our Software Development Services Are At The Heart Of What We Do. We Specialize In Creating Custom Web Applications, Enterprise Solutions, And Mobile Apps That Are Scalable, Secure, And User-Friendly. Our Team Of Expert Developers Follows Agile Methodologies To Ensure Timely Delivery And High-Quality Code. From Initial Concept To Final Deployment, We Work Closely With You To Bring Your Vision To Life.',
    },
    {
        slug: 'elearning',
        title: 'eLearning',
        icon: 'School',
        description:
            'Seeking Premium Quality Elearning Solutions At Pocket-Friendly Rates? We Deliver Custom Courses, Mobile Learning, And More To Meet Your Needs.',
        longDescription:
            'Transform Your Training And Education Programs With Our Innovative Elearning Solutions. We Design And Develop Engaging And Interactive Custom Courses, Learning Management Systems (LMS), And Mobile Learning Applications. Our Instructional Designers And Multimedia Experts Collaborate To Create Content That Is Not Only Informative But Also Memorable And Effective, Ensuring Your Learners Achieve Their Goals.',
    },
    {
        slug: 'multimedia',
        title: 'Multimedia',
        icon: 'Cuboid',
        description:
            'In This Digital Age, Compelling Multimedia Is Key. We Create Stunning 2D/3D Animations, Graphics, And UI/UX Designs That Captivate Your Audience.',
        longDescription:
            "Capture Your Audience's Attention With Stunning Multimedia Content. Our Creative Team Produces High-Quality 2D And 3D Animations, Motion Graphics, And Visual Effects For A Variety Of Platforms. We Also Specialize In UI/UX Design, Creating Intuitive And Beautiful Interfaces That Provide A Seamless User Experience. Let Us Help You Tell Your Story In A Visually Compelling Way.",
    },
    {
        slug: 'digital-marketing',
        title: 'Digital Marketing',
        icon: 'Megaphone',
        description:
            'The Internet Has Firmly Established Itself As The Future For All Of Us. We Help You Navigate It With SEO, Social Media, And Content Marketing Strategies.',
        longDescription:
            "Navigate The Digital Landscape With Our Comprehensive Marketing Services. We Develop And Execute Data-Driven Strategies For SEO, Social Media Marketing, Content Marketing, And Pay-Per-Click (PPC) Advertising. Our Goal Is To Increase Your Online Visibility, Drive Targeted Traffic, And Generate Qualified Leads That Convert Into Loyal Customers. Let's Grow Your Brand Together.",
    },
    {
        slug: 'qa-testing',
        title: 'QA/Testing',
        icon: 'CheckCircle',
        description:
            'Our Final Content Delivery Undergoes A Rigorous Quality Assurance Process To Guarantee Flawless Performance, Security, And User Experience Across All Platforms.',
        longDescription:
            'Ensure Your Software Is Bug-Free And Performs Flawlessly With Our Rigorous QA And Testing Services. We Offer A Full Range Of Testing Solutions, Including Manual And Automated Testing, Performance Testing, And Security Testing. Our Meticulous Approach Guarantees That Your Application Meets The Highest Standards Of Quality, Reliability, And User Experience Before It Reaches Your Customers.',
    },
    {
        slug: 'data-analysis',
        title: 'Data Analysis',
        icon: 'AreaChart',
        description:
            'Unlock Actionable Insights From Your Data With Our Advanced Analytics, Visualization, And Business Intelligence Solutions.',
        longDescription:
            'Turn Your Data Into A Strategic Asset With Our Advanced Data Analysis Services. We Help You Collect, Process, And Analyze Large Datasets To Uncover Valuable Insights That Drive Informed Business Decisions. Our Expertise Includes Data Visualization, Business Intelligence Dashboards, And Predictive Analytics. Let Us Help You Unlock The Power Of Your Data.',
    },
    {
        slug: 'cloud-devops',
        title: 'Cloud & DevOps',
        icon: 'Cloud',
        description:
            'Streamline Your Infrastructure And Accelerate Development With Our Expert Cloud Architecture And Devops Services.',
        longDescription:
            'Accelerate Your Development Pipeline And Improve Your Infrastructure With Our Cloud And Devops Services. We Specialize In Cloud Architecture Design, Migration, And Management On Platforms Like AWS, Azure, And Google Cloud. Our Devops Practices, Including Continuous Integration And Continuous Delivery (CI/CD), Help You Release Software Faster And More Reliably.',
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
