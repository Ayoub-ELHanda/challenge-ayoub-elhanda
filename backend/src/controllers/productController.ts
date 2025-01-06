// backend/src/controllers/productController.ts
import Product from '../models/Product';
import User from '../models/User';

export const getUserLibrary = async (req, res) => {
  const userId = req.user.id; // Assurez-vous que `user` est injecté via JWT auth middleware

  try {
    const user = await User.findById(userId).populate('purchasedProducts');
    res.json(user.purchasedProducts);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
