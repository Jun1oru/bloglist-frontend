import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("form calls event handler with right details when blog is created", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const inputTitle = screen.getByPlaceholderText("input title");
    const inputAuthor = screen.getByPlaceholderText("input author");
    const inputUrl = screen.getByPlaceholderText("input url");
    const button = screen.getByText("create");

    await user.type(inputTitle, "My blog");
    await user.type(inputAuthor, "Ada Lovelace");
    await user.type(inputUrl, "http://localhost");
    await user.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toStrictEqual({
      title: "My blog",
      author: "Ada Lovelace",
      url: "http://localhost",
    });
  });
});
