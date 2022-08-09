import { Router, Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import authRouter from './AuthRouter';
import partyRouter from './PartyRouter';
import taskRouter from './TaskRouter';
import guestRouter from './GuestRouter';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Easy my Party API');
});
router.post('/sendGridTest', async (req: Request, res: Response) => {
  const apiKey = String(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(apiKey);
  const msg = {
    to: 'lgsfarias.dev@gmail.com',
    from: 'lgsfarias.dev@gmail.com',
    templateId: 'd-b50d3d36c409443ebf4cf66683d28cb6',
    dynamic_template_data: {
      party: {
        name: '[Nome da Festa]',
        datetime: {
          date: '[data da festa]',
          time: '[hora da festa]',
        },
        adress: {
          street: '[Rua, numero e complement]',
          city: '[Cidade]',
          state: '[Estado]',
        },
      },
      confirmationlink: 'https://google.com',
    },
  };

  try {
    await sgMail.send(msg);
    res.send('Email enviado com sucesso');
  } catch (error: any) {
    console.log(error.response.body.errors);
    res.send('Erro ao enviar email');
  }
});

router.use(authRouter);
router.use(partyRouter);
router.use(taskRouter);
router.use(guestRouter);

export default router;
