"use client";

import * as React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Plus, Grid, List, ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

// Types et données pour la table
type ResearchItem = {
  id: string;
  name: string;
  type: "entreprise" | "motcle" | "position" | "cree";
  date: string;
  status: "active" | "inactive" | "pending";
  tags: string[];
};

const data: ResearchItem[] = [
  {
    id: "1",
    name: "Recherche Entreprise X",
    type: "entreprise",
    date: "2023-10-15",
    status: "active",
    tags: ["tech", "startup"],
  },
  {
    id: "2",
    name: "Mot-clé: Développement",
    type: "motcle",
    date: "2023-10-14",
    status: "active",
    tags: ["dev", "web"],
  },
  {
    id: "3",
    name: "Position: CTO",
    type: "position",
    date: "2023-10-12",
    status: "pending",
    tags: ["management"],
  },
  {
    id: "4",
    name: "Nouvelle recherche",
    type: "cree",
    date: "2023-10-10",
    status: "inactive",
    tags: ["test"],
  },
  {
    id: "5",
    name: "Entreprise Y",
    type: "entreprise",
    date: "2023-10-08",
    status: "active",
    tags: ["finance"],
  },
];

export const columns: ColumnDef<ResearchItem>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("type") === "motcle" ? "Mot-clé" : row.getValue("type")}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <div className="capitalize">
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.getValue("status") === "active" 
            ? "bg-green-100 text-green-800" 
            : row.getValue("status") === "pending" 
              ? "bg-yellow-100 text-yellow-800" 
              : "bg-gray-100 text-gray-800"
        }`}>
          {row.getValue("status")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {(row.getValue("tags") as string[]).map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const research = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(research.id)}
            >
              Copier l'ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Voir détails</DropdownMenuItem>
            <DropdownMenuItem>Modifier</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ResearchPage() {
  const [viewMode, setViewMode] = useState('cartes'); // 'cartes' or 'grille'
  const [activeCardTab, setActiveCardTab] = useState('profils'); // 'profils' or 'tags'
  const [activeGridTab, setActiveGridTab] = useState('entreprise'); // 'entreprise', 'motcle', 'position', 'cree'
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Configuration de la table
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Mode recherche
              </h1>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
              <button
                onClick={() => setViewMode('cartes')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'cartes' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <List className="h-4 w-4 mr-2" />
                Vue Cartes
              </button>
              <button
                onClick={() => setViewMode('grille')}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  viewMode === 'grille' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Grid className="h-4 w-4 mr-2" />
                Vue Grille
              </button>
              <Link
                href="/dashboard/generator"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-1" />
                Crée une grille
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar */}
        <div className="mb-8 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Vue Cartes */}
        {viewMode === 'cartes' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveCardTab('profils')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeCardTab === 'profils' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Rechercher des profils
                </button>
                <button
                  onClick={() => setActiveCardTab('tags')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeCardTab === 'tags' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Rechercher tags
                </button>
              </nav>
            </div>
            <div className="p-6">
              {data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-2">
                        Type: {item.type === 'motcle' ? 'Mot-clé' : item.type}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Aucune donnée disponible</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vue Grille */}
        {viewMode === 'grille' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                <button
                  onClick={() => setActiveGridTab('entreprise')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeGridTab === 'entreprise' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Entreprise
                </button>
                <button
                  onClick={() => setActiveGridTab('motcle')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeGridTab === 'motcle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Mot-clé
                </button>
                <button
                  onClick={() => setActiveGridTab('position')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeGridTab === 'position' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Position
                </button>
                <button
                  onClick={() => setActiveGridTab('cree')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeGridTab === 'cree' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Créé
                </button>
              </nav>
            </div>
            <div className="p-6">
              {data.length > 0 ? (
                <div className="w-full">
                  <div className="flex items-center py-4">
                    <Input
                      placeholder="Filtrer par nom..."
                      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                      onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                      }
                      className="max-w-sm"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                          Colonnes <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => {
                            return (
                              <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                  column.toggleVisibility(!!value)
                                }
                              >
                                {column.id === 'name' ? 'Nom' : 
                                 column.id === 'type' ? 'Type' : 
                                 column.id === 'date' ? 'Date' : 
                                 column.id === 'status' ? 'Statut' : 'Tags'}
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="overflow-hidden rounded-md border">
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                </TableHead>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                            >
                              Pas de résultats.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div className="text-muted-foreground text-sm">
                      {table.getFilteredSelectedRowModel().rows.length} sur{" "}
                      {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
                    </div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                          >
                            Précédent
                          </Button>
                        </PaginationItem>
                        {Array.from({ length: table.getPageCount() }).map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              href="#"
                              isActive={table.getState().pagination.pageIndex === index}
                              onClick={() => table.setPageIndex(index)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                          >
                            Suivant
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Pas de données</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}