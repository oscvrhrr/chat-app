interface ConnectionStateProps {
  isConnected: boolean;
}

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <p className="border absolute right-0">State: { '' + isConnected }</p>;
}