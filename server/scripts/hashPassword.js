import bcrypt from 'bcryptjs';

async function hashPassword() {
  const password = 'realtor123';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Password:', password);
  console.log('Hashed Password:', hashedPassword);
}

hashPassword(); 