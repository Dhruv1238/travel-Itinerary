"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `I will provide you with details regarding :
Destination (TextField)
Journey start date
Journey end date
Daily Budget (TextField)
Number of Travellers (TextField)
Accommodations (Select)

And you will have to create an itinerary for me in this json format only and it should be directly parsable by the frontend dont put anything before or after this json object:
{
  "itinerary": [
    {
      "day": "",
      "date": "",
      "activities": [
        {
          "name": "",
          "description": "",
          "location": "",
          "time": ""
        },
        // Add more activities here as needed
      ]
    },
    {
      "day": "",
      "date": "",
      "activities": [
        {
          "name": "",
          "description": "",
          "location": "",
          "time": ""
        },
        // Add more activities here as needed
      ]
    },
    // Add more days here as needed
  ]
}`,
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 30000,
    responseMimeType: "text/plain",
};

const ItenararyPage = () => {
    const searchParams = useSearchParams();
    const [itinerary, setItinerary] = useState(null);

    const destination = searchParams.get("destination");
    const budget = searchParams.get("budget");
    const travellers = searchParams.get("travellers");
    const accommodation = searchParams.get("accommodation");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    useEffect(() => {
        async function fetchItinerary() {
            const chatSession = model.startChat({
                generationConfig,
                history: [],
            });

            const message = `
        Destination: ${destination}
        Journey start date: ${startDate}
        Journey end date: ${endDate}
        Daily Budget: ${budget}
        Number of Travellers: ${travellers}
        Accommodations: ${accommodation}
      `;

            const result = await chatSession.sendMessage(message);
            const responseText = await result.response.text(); // Await the response text
            console.log(responseText);
            const cleanedResponseText = responseText.replace(/```json|```/g, ''); // Remove backticks
            setItinerary(JSON.parse(cleanedResponseText));
        }

        fetchItinerary();
    }, [destination, budget, travellers, accommodation, startDate, endDate]);

    if (!itinerary) {
        return (
            <div className=" h-screen w-screen flex justify-center items-center text-xl">
                <Spinner color="default" size="lg" />
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Itinerary Details</h1>
            {itinerary.itinerary.map((day, index) => (
                <div key={index} className="mb-4 flex-wrap gap-5">
                    <Card shadow className="p-4 bg-black border-white border">
                        <CardHeader className="text-xl font-semibold">
                            <div className="flex flex-col">
                                <p className="text-md">{day.day}</p>
                                <p className="text-small text-default-500">{day.date}</p>
                            </div>
                        </CardHeader>
                        <Divider className="bg-white" />
                        <CardBody className="flex flex-row gap-5 mt-3">
                            {day.activities.map((activity, idx) => (
                                <Card key={idx} shadow className="p-4 w-[400px] bg-black border-white border">
                                    <CardHeader className="text-xl font-semibold">
                                        <div className="flex flex-col">
                                            <p className=" text-sm">{activity.time}</p>
                                            <p className="text-small text-default-500 mt-4">{activity.location}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider className="bg-white m-2" />
                                    <CardBody className="flex flex-col gap-2">
                                        <p><strong>Goal:</strong> {activity.name}</p>
                                        <p><strong>Description:</strong> {activity.description}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </CardBody>
                    </Card>
                </div>
            ))}
        </div>
    );
};

const ItenararyPageWrapper = () => (
    <Suspense fallback={
        <div className=" h-screen w-screen flex justify-center items-center text-xl">
            <Spinner color="default" size="lg" />
        </div>}>
        <ItenararyPage />
    </Suspense>
);

export default ItenararyPageWrapper;