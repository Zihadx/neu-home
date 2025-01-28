"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useLocation from "@/components/DetailsPage/loactions/dynamicLocations";
import ZipSearchForm from "@/components/DetailsPage/ZipSearchForm/ZipSearchForm";
import Image from "next/image";
import WalkInShower from "@/components/DetailsPage/servicesSection/WalkInShower";
import Advantages from "@/components/DetailsPage/Advantages/Advantages";
import Features from "@/components/DetailsPage/Features/Features";
import Inspirations from "@/components/DetailsPage/Inspirations/Inspirations";
import WorksSections from "@/components/Home/Works/Works";
import HomeOwnersHelped from "@/components/Home/HomeOwnersHelped/HomeOwnersHelped";
import TestimonialsSlider from "@/components/DetailsPage/Reviews/Reviews";
import OfferSection from "@/components/DetailsPage/servicesSection/WalkInShower";

type Project = {
  id: string;
  title: string;
  description: string;
  features: string[];
  advantages: string[];
  inspirations: { image: string; title: string }[];
  reviews: { name: string; comment: string }[];
};

const ProjectDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const location = useLocation();
  const [allData, setAllData] = useState<Project[] | null>(null);
  const [zipStatus, setZipStatus] = useState<string | null>(null);
  const [zipDetails, setZipDetails] = useState<{ city: string; state: string } | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fakeDb.json`, {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Project[] = await response.json();
        setAllData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setAllData(null);
      }
    };

    fetchAllData();
  }, []);

  if (!allData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-700">
        <h1 className="text-2xl font-bold">Loading data...</h1>
      </div>
    );
  }

  const project = allData.find((item) => item.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-700">
        <h1 className="text-2xl font-bold">Project not found. Please check the URL.</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-6 md:py-12 max-h-[480px] md:min-h-[500px] mt-20">
        <div className="absolute inset-0 z-0">
          <Image src="/images/inspiration-slide3.webp" alt="Background Image" layout="fill" objectFit="cover" quality={100} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-transparent z-10" />

        <div className="relative max-w-2xl mx-auto px-2 md:px-6 py-4 md:py-8 text-gray-800 z-20">
          <div className="text-center mb-4 md:mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:leading-snug">
              How Much Does It Cost to <span>{project.title}</span> in <span className="font-extrabold">{location}</span>?
            </h1>
          </div>
          <ZipSearchForm projectId={id} onStatusChange={setZipStatus} onZipLocations={setZipDetails} />
        </div>
      </section>

      {/* Passing full allData */}
      <OfferSection allData={allData} projectId={id} />
      <Advantages allData={allData} projectId={id} />
      <Features allData={allData} projectId={id} />
      <Inspirations allData={allData} projectId={id} />
      <WorksSections />
      <HomeOwnersHelped />
      <TestimonialsSlider allData={allData} projectId={id} />
    </div>
  );
};

export default ProjectDetails;
