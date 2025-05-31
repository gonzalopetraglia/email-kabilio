import { mockDeep, mockReset } from "vitest-mock-extended";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import {
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "@remix-run/react";

export const mockedPrisma = mockDeep();

vi.mock("../../lib/prisma", () => ({
  default: mockedPrisma,
}));


vi.mock("@remix-run/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@remix-run/react")>();
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
    useFetcher: vi.fn(() => ({
      Form: vi.fn(),
      submit: vi.fn(),
      data: undefined,
      state: 'idle',
    })),
    useNavigate: vi.fn(),
    useActionData: vi.fn(),
    useSubmit: vi.fn(),
  };
});

  const mockUser = {
    id: 1,
    name: 'Test name',
    accounts: [{ id: 1, email: "test@example.com", userId: 1 }],
  };
  const mockEmails = [
    {
    id: 1,
    subject: "Test Email",
    name: 'Email name',
    from: 'test@test.com',
    text: 'example text email',
    read: false,
    deleted: false,
    createdAt: new Date(),
    labels: [],
    accountId: 1,
  },
      {
    id: 2,
    subject: "test Email 2",
    name: 'Email name 2',
    from: 'test2@test.com',
    text: 'example text email 2',
    read: true,
    deleted: false,
    createdAt: new Date(),
    labels: [],
    accountId: 1,
  }
  ];

beforeAll(() => {
  // ...
});

  beforeEach(() => {
    vi.mocked(useLoaderData).mockReturnValue({
      user: mockUser,
      emails: mockEmails,
    });

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      vi.fn(),
    ]);

    vi.mocked(useNavigate).mockReturnValue(vi.fn()); // Mockear navigate

  });

afterEach(() => {
  cleanup();
  mockReset(mockedPrisma);
});

afterAll(() => {
  // ...
});