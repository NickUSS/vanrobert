import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Algo salió mal
                        </h2>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
                        >
                            Intentar de nuevo
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}