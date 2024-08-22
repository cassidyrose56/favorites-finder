import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { useApiIsLoaded, Map } from '@vis.gl/react-google-maps';

// Mock the @vis.gl/react-google-maps module
vi.mock('@vis.gl/react-google-maps', () => ({
  Map: vi.fn(() => <div data-testid="mock-map">Mock Map</div>),
  useApiIsLoaded: vi.fn(),
}));

describe('App Component', () => {
  it('renders loading state when API is not loaded', () => {
    // Mock useApiIsLoaded to return false
    vi.mocked(useApiIsLoaded).mockReturnValue(false);

    render(<App />);

    // Check if the "Loading..." text is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // Ensure the Map is not rendered
    expect(screen.queryByTestId('mock-map')).not.toBeInTheDocument();
  });

  it('renders the Map component when API is loaded', async () => {
    // Mock useApiIsLoaded to return true
    vi.mocked(useApiIsLoaded).mockReturnValue(true);

    render(<App />);

    // Wait for the Map to be rendered
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByTestId('mock-map')).toBeInTheDocument();
    });
  });
});
