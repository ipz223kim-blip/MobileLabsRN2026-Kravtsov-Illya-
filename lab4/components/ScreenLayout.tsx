import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getStorageStats} from "@/utils/fsHelper";

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  const k = bytes / 1024;
  if (k < 1024) return `${k.toFixed(2)} KB`;
  const m = k / 1024;
  if (m < 1024) return `${m.toFixed(2)} MB`;
  const g = m / (1024 * 1024);
  return `${g.toFixed(2)} GB`;
};

const ScreenLayout: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const [stats, setStats] = useState<{ total: number; free: number; used: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await getStorageStats();
        setStats(s);
      } catch (e) {
        console.error('Не вдалося отримати статистику:', e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {children}
      {stats && (
        <View style={styles.statsBar}>
          <Text style={styles.statText}>Загальний: {formatBytes(stats.total)}</Text>
          <Text style={styles.statText}>Вільний: {formatBytes(stats.free)}</Text>
          <Text style={styles.statText}>Зайнято: {formatBytes(stats.used)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingBottom: 20,
  },
  statText: {fontSize: 12},
});

export default ScreenLayout;