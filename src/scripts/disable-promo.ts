
import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from '../lib/db';
import { SiteSettings } from '../lib/models';

async function disablePromo() {
    try {
        await connectToDatabase();
        console.log('Connected to DB');
        const result = await SiteSettings.updateMany({}, { $set: { promoEnabled: false } });
        console.log('Update result:', result);
        console.log('Promo banner disabled.');
    } catch (error) {
        console.error('Error disabling promo:', error);
    } finally {
        process.exit();
    }
}

disablePromo();
