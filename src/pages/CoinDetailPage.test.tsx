import CoinDetailPage from "./CoinDetailPage";
import { render, screen, waitFor } from "../tests/test-utils";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
const server = setupServer(
  rest.get(
    "https://api.coingecko.com/api/v3/coins/:cryptocurrency/market_chart",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }
  )
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());
let mockReturn="bitcoin";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    cryptocurrency: mockReturn,
  }),
  useRouteMatch: () => ({ url: `/coins/${mockReturn}` }),
}));
const setUp = async () => {
  render(<CoinDetailPage />);
  const loadingText = await screen.findByText("Loading");
  expect(loadingText).toBeInTheDocument();
};
it("renders coin detail page with bitcoin", async () => {
  setUp();
  const text =await screen.findByText(/bitcoin/i);
  expect(text).toBeInTheDocument();
});
it("renders coin detail page with eth", async () => {
    mockReturn = "ripple";
    setUp();
    const text =await screen.findByText(/ripple/i);
    expect(text).toBeInTheDocument();
  });
