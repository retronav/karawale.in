import { config } from "dotenv";

config();

export default function () {
    return {
		UMAMI_TRACKING_URL: process.env.UMAMI_TRACKING_URL || "",
        UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID || ""
    };
}
