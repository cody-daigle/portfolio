import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const sendContactMessage = vi.fn();

vi.mock("../api/client", () => ({
  sendContactMessage: (...args: unknown[]) => sendContactMessage(...args),
}));

const { default: Contact } = await import("../components/Contact");

beforeEach(() => {
  sendContactMessage.mockReset();
});

describe("Contact form", () => {
  it("submits the entered values and shows a success message", async () => {
    sendContactMessage.mockResolvedValue({ id: "abc" });
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Great site!" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message was sent/i)).toBeInTheDocument();
    });

    expect(sendContactMessage).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Great site!",
    });
  });

  it("shows an error message when the request fails", async () => {
    sendContactMessage.mockRejectedValue(new Error("Too many requests"));
    render(<Contact />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hi" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText("Too many requests")).toBeInTheDocument();
    });
  });
});
