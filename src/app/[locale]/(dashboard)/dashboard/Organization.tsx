"use client";

import { useQuery } from "@tanstack/react-query";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";
import Link from "next/link";
import { ChevronDown, Plus } from "lucide-react";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useRouter } from "next/navigation";

interface Organization {
  id: string;
  name: string;
}

const Organization = () => {
  const router = useRouter();

  // Récupération des organisations de l'utilisateur
  const { data: organizations, isLoading } = useQuery<Organization[]>({
    queryKey: ["organizations"],
    queryFn: async () => {
      const response = await fetch("/api/organizations");
      if (!response.ok) throw new Error("Erreur de chargement");
      return response.json();
    },
  });

  // Organisation actuelle
  const currentOrganization = organizations?.[0];

  const handleCreateWorkspace = () => {
    router.push("/create-workspace");
  };

  return (
    <HoverCard openDelay={0} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2 rounded-full border-2 border-orange-500 px-3 py-1.5 cursor-pointer transition-colors hover:bg-orange-50">
          {isLoading ? (
            <Skeleton className="w-6 h-6 rounded-full" />
          ) : (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm font-bold">
              {currentOrganization?.name.charAt(0) || "M"}
            </div>
          )}
          <div className="flex flex-col items-start">
            {isLoading ? (
              <>
                <Skeleton className="h-3.5 w-[80px] mb-1" />
                <Skeleton className="h-3 w-[60px]" />
              </>
            ) : (
              <span className="text-xs font-medium max-w-[100px] truncate">
                {currentOrganization?.name || "Mon espace"}
              </span>
            )}
          </div>
          <ChevronDown size={14} className="text-orange-500" />
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        className="w-52 p-1.5 shadow-md border border-orange-100 rounded-lg bg-white"
        sideOffset={5}
        align="center"
        side="bottom"
      >
        <div className="space-y-1">
          {isLoading ? (
            <div className="space-y-1.5">
              <Skeleton className="h-8 w-full rounded" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
          ) : (
            <>
              <div className="max-h-[200px] overflow-y-auto">
                {organizations?.map((org) => (
                  <Link
                    key={org.id}
                    href={`/dashboard/organization/${org.id}`}
                    className="flex items-center px-2.5 py-1.5 rounded-md text-sm cursor-pointer hover:bg-orange-50"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mr-2">
                      {org.name.charAt(0)}
                    </span>
                    <span className="truncate">{org.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-orange-100 my-1"></div>

              <div
                className="flex items-center px-2.5 py-1.5 rounded-md text-sm cursor-pointer hover:bg-orange-50 text-orange-600"
                onClick={handleCreateWorkspace}
              >
                <Plus className="h-4 w-4 mr-2" />
                <span>Nouvel espace</span>
              </div>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Organization;