import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Filter, X, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface FilterOption {
  label: string;
  type: 'select' | 'date' | 'range' | 'text';
  options?: string[];
  placeholder?: string;
}

interface AdvancedFilterProps {
  filters: Record<string, FilterOption>;
  onApply: (filters: Record<string, any>) => void;
}

export function AdvancedFilter({ filters, onApply }: AdvancedFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [date, setDate] = useState<Date>();

  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setDate(undefined);
    onApply({});
  };

  const handleApply = () => {
    onApply(activeFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).filter(key => activeFilters[key]).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-primary text-white">{activeFilterCount}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {Object.entries(filters).map(([key, filter]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{filter.label}</Label>
              
              {filter.type === 'select' && filter.options && (
                <Select
                  value={activeFilters[key] || ''}
                  onValueChange={(value) => handleFilterChange(key, value)}
                >
                  <SelectTrigger id={key}>
                    <SelectValue placeholder={filter.placeholder || `Select ${filter.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {filter.type === 'text' && (
                <Input
                  id={key}
                  placeholder={filter.placeholder}
                  value={activeFilters[key] || ''}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                />
              )}

              {filter.type === 'date' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>{filter.placeholder || 'Pick a date'}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        handleFilterChange(key, newDate);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}

              {filter.type === 'range' && (
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={activeFilters[`${key}_min`] || ''}
                    onChange={(e) => handleFilterChange(`${key}_min`, e.target.value)}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={activeFilters[`${key}_max`] || ''}
                    onChange={(e) => handleFilterChange(`${key}_max`, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {activeFilterCount > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-3">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).filter(([_, value]) => value).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="gap-1">
                  {filters[key]?.label || key}: {String(value)}
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t space-y-3">
          <Button onClick={handleApply} className="w-full">
            Apply Filters
          </Button>
          {activeFilterCount > 0 && (
            <Button onClick={handleClearFilters} variant="outline" className="w-full">
              Clear All Filters
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
