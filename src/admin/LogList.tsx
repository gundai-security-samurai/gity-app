import type React from "react";
import { useEffect, useState } from "react";

interface Log {
  id: number;
  timestamp: string;
  action: string;
}

const LogList: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    // Mock data fetching
    const fetchLogs = async () => {
      const data = [
        {
          id: 1,
          timestamp: "2025-01-19T10:00:00",
          action: "Person detected in electronics section",
        },
        {
          id: 2,
          timestamp: "2025-01-19T10:05:00",
          action: "Person detected in clothing section",
        },
      ];
      setLogs(data);
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Log List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogList;
