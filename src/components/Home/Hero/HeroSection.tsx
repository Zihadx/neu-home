"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface AllData {
  allData: { id: string; title: string }[]; 
}

const HeroSection = ({ allData }: AllData) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (id: string) => {
    setSelectedValue(id);
  };

  return (
    <section className="relative bg-gray-50 mt-20 py-8 overflow-hidden px-2 md:px-0">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.webp"
          alt="Background"
          layout="fill"
          objectFit="contain"
          objectPosition="100% center"
          className="translate-x-[200px]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-200 via-[50%] to-transparent" />

      <div className="relative mx-auto max-w-[1180px] px-2 h-full z-10 text-gray-950 -top-24 md:top-0">
        <div className="lg:w-1/2 mt-28">
          <div className="bg-green-500 opacity-10 h-[28px] rounded-full my-2 w-60 "></div>
          <h1 className="text-[40px] font-bold leading-tight mb-4">
            A New Way for Home Improvement <br /> Projects
          </h1>
          <p className="text-xl mb-6 text-gray-500 leading-normal">
            Transform Your Home with Ease: Discover the Perfect Helping Hand for
            Stress-Free Home Improvement <br /> Projects.
          </p>
        </div>

        {/* Dropdown and Button ------------------ */}
        <div className="mt-20">
          <h3 className="text-center text-xl font-semibold mb-4">
            Start your Home Improvement Project
          </h3>
          <div className="flex justify-center items-center rounded-lg gap-2 md:gap-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white px-4 py-2 md:rounded-l-sm md:rounded-r-none rounded-sm w-full sm:w-[250px] text-left shadow-xl shadow-gray-300">
                {selectedValue ? allData.find(item => item.id === selectedValue)?.title : "Select project type"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[250px]">
                {allData.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onClick={() => handleSelect(project.id)}
                  >
                    {project.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href={`/${selectedValue}`}
              passHref
            >
              <button
                className="bg-green-500 text-white px-4 py-2 md:rounded-r-sm rounded-sm md:rounded-l-none hover:bg-green-600 w-full sm:w-auto min-w-[150px]"
              >
                Get Estimate
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-0 m-2">
        <Image src="images/dots-v.svg" width={160} height={160} alt="dot-v" />
      </div>
    </section>
  );
};

export default HeroSection;
