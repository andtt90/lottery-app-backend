export interface Ticket {
    boxesArray: Box[];
    superzahl?: number
  }
  
export interface DbTicket {
    id: number;
    boxes: Box[];
    superzahl?: number | null;
  }

export interface Box {
  numbers: [];
}

export interface DbBox {
  id: number;
  numbers: string;
  ticket: DbTicket;
  ticketId: number;
}