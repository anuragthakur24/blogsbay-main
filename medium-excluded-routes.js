
/**
 * DON'T FORGET TO DELETE THE ROUTE WHEN UPLOADING THE FOLLOWNG CODE ONLINE :-
 */

//DELETE ALL THE ROUTES (only use in local mode..)

/*
blogRoutes.delete('/delete-all-posts', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    // Delete all blog posts
    const deletedPosts = await prisma.blog.deleteMany({});

    // Respond with the number of deleted posts
    return c.json({
        message: `${deletedPosts.count} posts deleted successfully`
    });
});
*/
/*
// Route to delete a user by username and password
userRoutes.delete('/delete-user', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const { username, password } = await c.req.json();

    // Delete the user directly
    await prisma.user.delete({
        where: {
            username: username,
            password: password,
        },
    },
    );
    return c.json({
        message: `User with username ${username} deleted successfully`,
    });
});
*/
/*ex:-
{
    "username":"gunther@gmail.com",
    "password":"123456"
}
*/

/*
// Route to delete all users (ONLY IF YOU WANT TO ERASE ALL DATA)
userRoutes.delete('/delete-all-users', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    // Delete all users
    const deletedUsers = await prisma.user.deleteMany({});

    // Respond with the number of deleted users
    return c.json({
        message: `${deletedUsers.count} users deleted successfully`
    });
});

https://backend.anuragthakur20for7.workers.dev
*/