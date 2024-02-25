// Imports
import express, { Express, Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client'
import { Ticket, DbTicket } from "./types";

// App setup
const app: Express = express();
const port: number = 3000;
const jsonParser = bodyParser.json();

app.use(cors());
app.use(express.json());
const allowedOrigins: Array<string> = ['http://localhost:4200'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

const prisma: PrismaClient = new PrismaClient();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// API endpoints
app.post('/sendTickets', jsonParser, (req: Request, res: Response) => {
  if (req.body.ticketsArray) {
    let results: DbTicket[] = [];    
    req.body.ticketsArray.forEach(async (ticket: Ticket, index: number) => {
      const result: DbTicket = await prisma.ticket.create({
        data: {
          numbers: ticket.numbers.toString(),
          superzahl: ticket.superzahl
        }
      });
      results.push(result);
      if (results.length === req.body.ticketsArray.length) {
        res.json({ results });
      }
    })
  }
})

app.get('/getAllTickets', async (req: Request, res: Response) => {
  const savedTickets = await prisma.ticket.findMany();
  const processedTickets = savedTickets.map((elem: DbTicket) => {
    const numbers = elem.numbers.split(',').map((numberElem: string) => {
      return parseInt(numberElem);
    })
    return {
      id: elem.id,
      numbers,
      superzahl: elem.superzahl
    }
  })
  res.send({ savedTickets: processedTickets })
})

app.delete('/deleteTickets', async (req: Request, res: Response) => {
  await prisma.ticket.deleteMany();
  res.send({});
})  

