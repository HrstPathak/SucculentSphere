export default function TrustBar() {
  return (
    <div className="bg-white rounded-lg p-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-brand)]">📦</span>
        <div>
          <div className="font-semibold">Safe Shipping</div>
          <div className="text-sm">Our plants arrive healthy and well-packaged</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-brand)]">🌿</span>
        <div>
          <div className="font-semibold">Healthy Plant Guarantee</div>
          <div className="text-sm">30-day guarantee on all plants</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-brand)]">⚡</span>
        <div>
          <div className="font-semibold">24/7 Support</div>
          <div className="text-sm">We're here to help</div>
        </div>
      </div>
    </div>
  );
}

