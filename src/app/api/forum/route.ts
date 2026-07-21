import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import DiscussionPost from '@/models/discussionPost';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const filter: any = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ title: regex }, { content: regex }, { authorName: regex }];
    }

    const posts = await DiscussionPost.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { action, postId, title, category, authorName, authorRole, content, replyText, verified, images } = body;

    let defaultChurch = await Church.findOne();

    if (action === 'reply' && postId) {
      const post = await DiscussionPost.findById(postId);
      if (!post) {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      }

      const newReply = {
        authorName: authorName || 'Anonymous',
        authorRole: authorRole || 'student',
        content: replyText,
        date: new Date(),
        verified: verified || authorRole === 'teacher' || authorRole === 'admin',
        likes: 0,
        likedBy: [],
      };

      post.replies.push(newReply);
      await post.save();

      // Realtime notification broadcast
      broadcastEvent('FORUM_REPLY_ADDED', { postId, reply: newReply });

      return NextResponse.json({ success: true, post });
    }

    if (action === 'like_post' && postId) {
      const post = await DiscussionPost.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
      broadcastEvent('FORUM_POST_LIKED', { postId, likes: post?.likes });
      return NextResponse.json({ success: true, post });
    }

    // Create new post
    const newPost = await DiscussionPost.create({
      title,
      category: category || 'Theology',
      authorName: authorName || 'Tinbit Elias',
      authorRole: authorRole || 'student',
      content,
      images: images || [],
      likes: 0,
      likedBy: [],
      replies: [],
      church: defaultChurch?._id,
    });

    broadcastEvent('FORUM_POST_CREATED', newPost);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await DiscussionPost.findByIdAndDelete(id);
    broadcastEvent('FORUM_POST_DELETED', { id });

    return NextResponse.json({ success: true, message: 'Post deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
