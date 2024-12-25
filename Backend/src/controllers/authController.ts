import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { isValidEmail, isValidPassword } from '../utils/validations';

export const register = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  // Validar e-mail e senha
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'E-mail inválido' });
    return;
  }

  if (!isValidPassword(senha)) {
    res.status(400).json({
      message:
        'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.',
    });
    return;
  }

  const hash = await bcrypt.hash(senha, 10);
  const user = await User.create({ email, senha: hash });
  res.status(201).json({ message: 'Usuário registrado com sucesso', user });
};

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ where: { email } });

  // Validar e-mail e senha
  if (!isValidEmail(email)) {
    res.status(400).json({ message: 'E-mail inválido' });
    return;
  }

  if (!isValidPassword(senha)) {
    res.status(400).json({
      message:
        'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.',
    });
    return;
  }

  if (!user) {
    res.status(404).json({ message: 'Usuário não encontrado' });
    return;
  }

  const validPassword = await bcrypt.compare(senha, user.senha);
  if (!validPassword) {
    res.status(401).json({ message: 'Senha incorreta' });
    return;
  }

  const token = generateToken(user.id);
  res.status(200).json({ message: 'Login bem-sucedido', token, id: user.id });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};
