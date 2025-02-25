import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { PrismaClient } from "@prisma/client/edge";
import { signinInput, signupInput } from "@anuragthakur24/medium-common-zod";
import bcrypt from "bcryptjs";

export const userRoutes = new Hono<{ Bindings: { JWT_PASS: string, DATABASE_URL: string } }>();

// Signup route - Handles new user registration
userRoutes.post('/signup', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();
    
    // Validate request body using Zod schema
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid credentials" });
    }
    
    try {
        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({ where: { username: body.username } });
        if (existingUser) {
            c.status(409);
            return c.json({ message: "Username already exists" });
        }
        
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(body.password, 10);
        
        // Create new user entry in the database
        const user = await prisma.user.create({
            data: { name: body.name, username: body.username, password: hashedPassword }
        });
        
        // Generate JWT token for authentication
        const token = await sign({ id: user.id }, c.env.JWT_PASS);
        return c.json({ jwt: token });
    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({ message: "Sign-up failed, please try again" });
    }
});

// Signin route - Authenticates existing users
userRoutes.post('/signin', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
    const body = await c.req.json();
    
    // Validate request body
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Invalid credentials" });
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { username: body.username } });
    if (!user) {
        c.status(403);
        return c.json({ error: "User not found" });
    }
    
    // Verify password
    const isPassValid = await bcrypt.compare(body.password, user.password);
    if (!isPassValid) {
        c.status(403);
        return c.json({ message: 'Invalid password' });
    }
    
    // Generate JWT token for the user
    const jwt = await sign({ id: user.id }, c.env.JWT_PASS);
    return c.json({ jwt });
});

// Logout route - Invalidates the user's session
userRoutes.post('/logout', async (c) => {
    const authHeader = c.req.header('Authorization');
    
    // Check if Authorization header exists
    if (authHeader) {
        return c.json({ message: 'Logged out successfully' });
    } else {
        c.status(403);
        return c.json({ message: 'JWT authentication failed' });
    }
});
