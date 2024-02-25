export interface Ticket {
    numbers: number[];
    superzahl?: number
  }
  
export interface DbTicket {
    id: number;
    numbers: string;
    superzahl?: number | null;
  }