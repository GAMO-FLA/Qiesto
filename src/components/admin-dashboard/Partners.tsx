import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  MoreVertical,
  Eye
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - replace with API calls
const MOCK_PARTNERS = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    status: 'pending',
    type: 'Technology',
    appliedDate: '2024-03-15',
    location: 'New York, USA',
    description: 'Leading technology solutions provider'
  },
  {
    id: '2',
    name: 'Green Energy Ltd',
    email: 'info@greenenergy.com',
    status: 'approved',
    type: 'Energy',
    appliedDate: '2024-03-14',
    location: 'London, UK',
    description: 'Sustainable energy solutions'
  },
  // Add more mock data as needed
];

const Partners = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [partners, setPartners] = useState(MOCK_PARTNERS);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const statusColors = {
    pending: 'text-yellow-500 bg-yellow-50',
    approved: 'text-green-500 bg-green-50',
    rejected: 'text-red-500 bg-red-50',
    suspended: 'text-gray-500 bg-gray-50'
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle,
    suspended: AlertCircle
  };

  const handleStatusChange = async (partnerId: string, newStatus: string) => {
    // API call would go here
    setPartners(partners.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Partner Management</h1>
        <Button>
          <Building2 className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Partners List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPartners.map((partner) => {
                const StatusIcon = statusIcons[partner.status];
                return (
                  <motion.tr
                    key={partner.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">{partner.name[0]}</span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-sm text-gray-500">{partner.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{partner.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[partner.status]}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(partner.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {partner.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusChange(partner.id, 'approved')}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(partner.id, 'rejected')}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {partner.status === 'approved' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(partner.id, 'suspended')}>
                              <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                              Suspend
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Partners;