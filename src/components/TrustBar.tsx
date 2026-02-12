export default function TrustBar() {
  return (
    <div className="border-t border-b border-neutral-200 py-4 mt-4">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-3 text-center text-sm font-medium">

          {/* Safe Shipping */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-[var(--color-brand)] text-lg">📦</span>
            <span>Safe Shipping</span>
          </div>

          {/* Guarantee */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-[var(--color-brand)] text-lg">🌿</span>
            <span>Healthy Plant Guarantee</span>
          </div>

          {/* Support */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-[var(--color-brand)] text-lg">📞</span>
            <span>24/7 Support</span>
          </div>

        </div>
      </div>
    </div>
  );
}
