// Imports
import express, { Express, Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from '@prisma/client'
import { Ticket, Box, DbTicket, DbBox } from "./types";

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
app.post('/sendTicket', jsonParser, async (req: Request, res: Response) => {
  const { boxesArray, superzahl } = req.body.ticket;
  const boxesData: DbBox = boxesArray.map((box: Prisma.BoxCreateInput) => {
    return { numbers: box.numbers.toString() }
  });

  if (req.body.ticket) {
    const ticket = await prisma.ticket.create({
      data: {
        boxes: {
          create: boxesData
        },
        superzahl
      }
    });
    res.json({ ticket });
  }
})

app.get('/getAllTickets', async (req: Request, res: Response) => {
  const savedTickets = await prisma.ticket.findMany({
    include: {
      boxes: true
    }
  });
  const processedTickets = savedTickets.map((elem) => {
    const boxes = elem.boxes.map((boxElem) => {
      return boxElem.numbers.split(',').map(numberElem => {
        return parseInt(numberElem);
      });
    });
    return {
      id: elem.id,
      boxes,
      superzahl: elem.superzahl
    }
  })
  res.send({ savedTickets: processedTickets });
})

app.get(`/ticket/:id`, async (req, res) => {
  const { id } = req.params
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(id),
    },
    include: { boxes: true }
  })
  const processedTicket = {
    id: ticket?.id,
    superzahl: ticket?.superzahl,
    boxesArray: ticket?.boxes.map((boxElem) => {
      return {
        numbers:
          boxElem.numbers.split(',').map(numberElem => {
            return parseInt(numberElem);
          })
      };
    })
  }
  res.json(processedTicket)
})

// app.delete('/deleteTickets', async (req: Request, res: Response) => {
//   await prisma.ticket.deleteMany();
//   res.send({});
// })

