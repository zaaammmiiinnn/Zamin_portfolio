import { NextResponse } from 'next/server';
import z from 'zod';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/contact';
import { transporter, sendAutoReply } from '@/lib/email';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required').trim(),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = contactSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json(
                { message: 'Invalid input', errors: validatedData.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { name, email, message } = validatedData.data;

        // Connect to database
        await connectToDatabase();

        // Save to database
        const newContact = await Contact.create({
            name,
            email,
            message,
        });

        // Send notification email to the owner
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Error sending notification email:', emailError);
            // We do not return an error here so that the user still gets a success response
            // if it was saved in the db successfully.
        }

        // Send auto-reply to the user
        try {
            await sendAutoReply(email, name);
        } catch (autoReplyError) {
            console.error('Error sending auto-reply email:', autoReplyError);
        }

        return NextResponse.json(
            { message: 'Message sent successfully!', data: newContact },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
