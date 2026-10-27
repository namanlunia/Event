/**
 * Placeholder shown while a lazily-loaded chart chunk is downloading.
 * Kept dependency-free (no recharts import) so it never triggers the
 * heavy bundle it is meant to delay.
 */
export default function ChartSkeleton() {
  return <div className="w-full h-full shimmer-bg rounded-xl" aria-hidden="true" />;
}
