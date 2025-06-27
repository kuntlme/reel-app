// Create a new user
const createUser = (data: {
  profilename: string;
  username: string;
  joining_date: Date;
  location: string;
}) =>
  prisma.user.create({ data });

// Read user by ID (with profile, creator & viewer info)
const getUserById = (userid: string) =>
  prisma.user.findUnique({
    where: { userid },
    include: { creator: true, viewer: true },
  });

// Read user by username
const getUserByUsername = (username: string) =>
  prisma.user.findUnique({ where: { username } });

// Update user
const updateUser = (userid: string, data: Partial<{
  profilename: string;
  username: string;
  joining_date: Date;
  location: string;
}>) =>
  prisma.user.update({ where: { userid }, data });

// Delete user
const deleteUser = (userid: string) =>
  prisma.user.delete({ where: { userid } });