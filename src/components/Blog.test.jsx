import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {

    const loggedUser = {
        token: 'token',
        username: 'test',
        name: 'Test user'
    };

    const blog = {
        title: 'My blog',
        author: 'Ada Lovelace',
        url: 'http://localhost',
        likes: 3,
        user: loggedUser
    };

    test('renders title and author, but not url and likes', async () => {
        
        const mockLike = vi.fn();
        const mockDelete = vi.fn();
        const container = render(
            <Blog
                blog={blog}
                likeBlog={mockLike}
                deleteBlog={mockDelete}
                loggedUser={loggedUser}
            />
        ).container;

        const header = container.querySelector('.blogHeader');
        expect(header).toBeDefined();
        await screen.findAllByText(`${blog.title} ${blog.author}`);

        const urlDiv = container.querySelector('.urlDiv');
        expect(urlDiv).toBeNull();

        const likesDiv = container.querySelector('.likesDiv');
        expect(likesDiv).toBeNull();
    });

    test('url and likes are shown after the button has been clicked', async () => {
        
        const mockLike = vi.fn();
        const mockDelete = vi.fn();
        const container = render(
            <Blog
                blog={blog}
                likeBlog={mockLike}
                deleteBlog={mockDelete}
                loggedUser={loggedUser}
            />
        ).container;
        
        const user = userEvent.setup();
        const button = screen.getByText('show');
        await user.click(button);

        const urlDiv = container.querySelector('.urlDiv');
        expect(urlDiv).toBeDefined();
        await screen.findAllByText(blog.url);

        const likesDiv = container.querySelector('.likesDiv');
        expect(likesDiv).toBeDefined();
        await screen.findAllByText(`likes ${blog.likes}`);
    });

    test('if like button is clicked twice, handler is called twice', async () => {
        
        const mockLike = vi.fn();
        const mockDelete = vi.fn();
        render(
            <Blog
                blog={blog}
                likeBlog={mockLike}
                deleteBlog={mockDelete}
                loggedUser={loggedUser}
            />
        );

        const user = userEvent.setup();
        const button = screen.getByText('show');
        await user.click(button);

        const likeButton = screen.getByText('like');
        await user.click(likeButton);
        await user.click(likeButton);

        expect(mockLike.mock.calls).toHaveLength(2);
    })
})


