import { useState } from "react"
import blogService from '../services/blogs';
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();
        createBlog({
            title,
            author,
            url,
        });

        setTitle('');
        setAuthor('');
        setUrl('');
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        data-testid="inputTitle"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder="input title"
                    />
                </div>
                <div>
                    author:
                    <input
                        data-testid="inputAuthor"
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                        placeholder="input author"
                    />
                </div>
                <div>
                    url:
                    <input
                        data-testid="inputUrl"
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                        placeholder="input url"
                    />
                </div>
                <button data-testid="createBlog"
                    type="submit"
                >
                    create
                </button>
            </form>
        </div>
    );
}
BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
};

export default BlogForm;