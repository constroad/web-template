import Dispatch, { DispatchModel, IGetAll } from '../models/dispatch';
interface IPagination {
  page?: string
  limit?: string
}

export class DispatchRepository {

  async getAll(query?: IPagination): Promise<IGetAll> {
    try {
      const {page, limit, ...filters} = query || {}
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const total = await Dispatch.countDocuments({...filters});
      const dispatchs = await Dispatch.find({...filters})
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

      return {
        dispatchs: dispatchs as IGetAll['dispatchs'],
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          totalRecords: total,
          totalPages: Math.ceil(total / limitNumber),
        }
      };
    } catch (error) {
      console.error('Error getting dispatchs:', error);
      throw new Error('Error getting dispatchs');
    }
  }

  async getById(id: string): Promise<DispatchModel | null> {
    try {
      const dispatch = await Dispatch.findById(id);
      return dispatch;
    } catch (error) {
      console.error('Error getting dispatchs:', error);
      throw new Error('Error getting dispatchs');
    }
  }


  async create(data: Partial<DispatchModel>): Promise<DispatchModel> {
    try {
      const newDispatch = new Dispatch(data);
      await newDispatch.save();
      return newDispatch;
    } catch (error) {
      console.error('Error saving Dispatch:', error);
      throw new Error('Error saving Dispatch');
    }
  }

  async update(id: string, data: Partial<DispatchModel>): Promise<DispatchModel> {
    try {
      const dispatchUpdated = await Dispatch.findByIdAndUpdate(id, data, { new: true });
      if (!dispatchUpdated) {
        throw new Error('Dispatch no found');
      }
      return dispatchUpdated;
    } catch (error) {
      console.error('Error updating Dispatch:', error);
      throw new Error('Error updating Dispatch');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await Dispatch.findByIdAndDelete(id);
      if (!result) {
        throw new Error('Dispatch no found');
      }
    } catch (error) {
      console.error('Error deleting Dispatch:', error);
      throw new Error('Error deleting Dispatch');
    }
  }
}
