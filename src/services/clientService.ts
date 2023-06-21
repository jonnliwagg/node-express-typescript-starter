import { db } from '../database/models';
import Client from '../database/models/client';

class ClientService {
  private static instance: ClientService;

  static getInstance(): ClientService {
    if (!ClientService.instance) {
      ClientService.instance = new ClientService();
    }
    return ClientService.instance;
  }

  //   findAll = async () => {
  //     const clients: Client[] = await db.Client.findAll();
  //     return clients;
  //   };

  //   findById = async (id: number) => {
  //     const existingClient: Client | null = await db.Client.findByPk(
  //       id
  //     );
  //     return existingClient;
  //   };

  findOne = async (name: string, key: string) => {
    const existingClient: Client | null = await db.Client.findOne({
      where: { name, key },
    });
    return existingClient;
  };

  save = async (object: any) => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!object && Object.keys(object).length == 0) {
        throw new Error('Object must contain at least one property');
      }
      const client = await Client.create({ ...object });
      return client;
    } catch (err) {
      throw err;
    }
  };
}

export default ClientService;
