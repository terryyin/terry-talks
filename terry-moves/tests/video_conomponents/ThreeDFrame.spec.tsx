import {act, render, screen} from '@testing-library/react';
import {ThreeDFrame} from '@/video_components/ThreeDFrame';

jest.mock('remotion', () => ({
  ...jest.requireActual('remotion'),
  useVideoConfig: () => ({width: 640, height: 360}),
}));

jest.mock('@remotion/three', () => ({
  ThreeCanvas: ({width, height, children}: {
    width: number;
    height: number;
    children: React.ReactNode;
  }) => <div data-testid="canvas" data-width={width} data-height={height}>{children}</div>,
}));

jest.mock('@/video_components/private/ThreeDFrameInner', () => ({
  ThreeDFrameInner: ({children}: {children: React.ReactNode}) => children,
}));

it('keeps a positive canvas during mount and follows valid parent resizes', () => {
  let dimensions = {width: 0, height: 0};
  let notifyResize: () => void = () => {throw new Error('ResizeObserver has not mounted');};
  const disconnect = jest.fn();
  const originalObserver = global.ResizeObserver;
  global.ResizeObserver = jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
    notifyResize = () => callback([], {} as ResizeObserver);
    return {observe: jest.fn(), unobserve: jest.fn(), disconnect};
  }) as unknown as typeof ResizeObserver;
  const width = jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get')
    .mockImplementation(() => dimensions.width);
  const height = jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => dimensions.height);

  try {
    const {unmount} = render(<ThreeDFrame><span>3D scene</span></ThreeDFrame>);
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toHaveAttribute('data-width', '640');
    expect(canvas).toHaveAttribute('data-height', '360');

    dimensions = {width: 1200, height: 800};
    act(() => notifyResize());
    expect(canvas).toHaveAttribute('data-width', '1200');
    expect(canvas).toHaveAttribute('data-height', '800');

    dimensions = {width: 480, height: 270};
    act(() => notifyResize());
    expect(canvas).toHaveAttribute('data-width', '480');
    expect(canvas).toHaveAttribute('data-height', '270');

    dimensions = {width: 0, height: 0};
    act(() => notifyResize());
    expect(canvas).toHaveAttribute('data-width', '480');
    expect(canvas).toHaveAttribute('data-height', '270');
    expect(screen.getByText('3D scene')).toBeInTheDocument();

    unmount();
    expect(disconnect).toHaveBeenCalled();
  } finally {
    global.ResizeObserver = originalObserver;
    width.mockRestore();
    height.mockRestore();
  }
});
