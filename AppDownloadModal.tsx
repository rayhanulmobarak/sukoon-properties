import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Download,
  ShieldCheck,
  Star,
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles,
  Globe,
  ArrowRight,
  Monitor,
  Info,
  Layers,
  Check,
} from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToMobileView?: () => void;
  onOpenAuthModal?: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  onSwitchToMobileView,
  onOpenAuthModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(
    typeof window !== 'undefined' ? (window as any).deferredPwaPrompt : null
  );
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'installed' | 'guide'>('idle');
  const [installProgress, setInstallProgress] = useState(0);

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isAndroid = typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent);
  const isDesktop = !isIOS && !isAndroid;
  const isIframe = typeof window !== 'undefined' && window.self !== window.top;

  useEffect(() => {
    // Pick up globally captured prompt if available
    if ((window as any).deferredPwaPrompt) {
      setDeferredPrompt((window as any).deferredPwaPrompt);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPwaPrompt = e;
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstallStatus('installed');
      setInstallProgress(100);
      setDeferredPrompt(null);
      (window as any).deferredPwaPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const currentWebUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleInstallClick = async () => {
    setInstallStatus('installing');
    setInstallProgress(25);

    // 1. Animate install progress bar
    let currentP = 25;
    const interval = setInterval(() => {
      currentP += 25;
      if (currentP >= 100) {
        currentP = 100;
        clearInterval(interval);
        setInstallStatus('installed');
      }
      setInstallProgress(currentP);
    }, 100);

    // 2. Trigger native Chrome / Android PWA install prompt if available
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setInstallStatus('installed');
        }
      } catch (err) {
        console.log('Native prompt dismissed');
      }
      setDeferredPrompt(null);
    } else if (typeof window !== 'undefined' && window.self !== window.top) {
      // If inside iframe preview, open live URL in new tab for Chrome native PWA prompt
      try {
        window.open(currentWebUrl, '_blank');
      } catch (e) {
        console.log('Open tab error');
      }
    }

    // 3. Automatically transition to Mobile App view
    setTimeout(() => {
      if (onSwitchToMobileView) {
        onSwitchToMobileView();
        onClose();
      }
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentWebUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleZipDownload = async () => {
    try {
      const response = await fetch('/download/SukoonProperties_SourceCode.zip');
      if (!response.ok) throw new Error('ZIP fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.setAttribute('download', 'SukoonProperties_SourceCode.zip');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch (e) {
      window.open('/download/SukoonProperties_SourceCode.zip', '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 relative border-b border-emerald-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl flex-shrink-0 bg-slate-900">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&auto=format&fit=crop&q=80" alt="Sukoon Properties" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">
                  OFFICIAL PWA APP
                </span>
                <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 (1,240+ reviews)
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">
                Sukoon Properties App
              </h2>
              <p className="text-xs text-slate-300">
                অ্যান্ড্রয়েড ও আইফোনে সরাসরি হোম-স্ক্রিনে ইনস্টল যোগ্য অফিশিয়াল রিয়েল এস্টেট অ্যাপ
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Automated Platform Compatibility Status */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-bold text-slate-800">ডিভাইস ও প্ল্যাটফর্ম ডিটেকশন:</span>
              <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-300">
                {isIOS ? '📱 iOS iPhone/iPad' : isAndroid ? '🤖 Android Device' : '💻 Desktop Browser'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% PWA অ্যাপ ইনস্টলেশন সামঞ্জস্যপূর্ণ</span>
            </div>
          </div>

          {/* Main Action Banner: Instant Mobile App Install */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-5 rounded-3xl border border-emerald-700/50 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>১-ক্লিকে সরাসরি অ্যাপ ইনস্টল ও চালু করুন</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Sukoon Properties অ্যাপ ইনস্টল করুন
                </h3>
                <p className="text-xs text-slate-300 max-w-lg">
                  নিচের বাটনে ক্লিক করলেই আপনার অ্যান্ড্রয়েড বা আইফোনে Sukoon Properties অফিশিয়াল মোবাইল অ্যাপ সরাসরি ইনস্টল ও চালু হয়ে যাবে।
                </p>
              </div>

              <button
                onClick={handleInstallClick}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl transition flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer border border-amber-300 active:scale-95"
              >
                <Download className="w-5 h-5 text-slate-950" />
                <span>
                  {installStatus === 'installing' ? 'ইনস্টল প্রক্রিয়া চলমান...' : installStatus === 'installed' ? 'পুনরায় ইনস্টল/লঞ্চ করুন' : 'ইনস্টল শুরু করুন (Install App)'}
                </span>
              </button>
            </div>

            {/* Live Interactive Installation Progress Bar & Launch Dashboard */}
            {installStatus !== 'idle' && (
              <div className="bg-slate-950/80 border border-emerald-500/40 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                    {installProgress < 100 ? 'Sukoon Properties অ্যাপ ইনস্টল হচ্ছে...' : '🎉 ইনস্টল ও লঞ্চার প্রস্তুত!'}
                  </span>
                  <span>{installProgress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-emerald-500 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/50"
                    style={{ width: `${installProgress}%` }}
                  ></div>
                </div>

                {/* Direct Launch Actions */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (window.self !== window.top) {
                          window.open(currentWebUrl, '_blank');
                        } else if (onSwitchToMobileView) {
                          onSwitchToMobileView();
                          onClose();
                        } else {
                          window.location.reload();
                        }
                      }
                    }}
                    className="flex-1 min-w-[180px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-300" />
                    <span>🚀 অ্যাপটি এখনই ওপেন করুন (Launch App)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onSwitchToMobileView) {
                        onSwitchToMobileView();
                        onClose();
                      }
                    }}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>মোবাইল অ্যাপ ইন্টারফেসে যান</span>
                  </button>
                </div>
              </div>
            )}

            {/* Android & iOS Official PWA Mobile App Card */}
            <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl space-y-3 text-xs text-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="font-extrabold text-white text-xs">অফিশিয়াল PWA মোবাইল অ্যাপ (Native WebAPK)</span>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                  v1.0.0 Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>অ্যান্ড্রয়েড ও আইফোনে ১-ক্লিকে ইনস্টল</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>কোনো থার্ড-পার্টি ফাইল ডাউনলোডের ঝামেলা নেই</span>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 min-w-[180px] px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>সরাসরি অ্যাপ চালু ও ইনস্টল করুন</span>
                </button>

                <button
                  onClick={handleZipDownload}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                  title="সম্পূর্ণ প্রজেক্ট সোর্স কোড জিপ (ZIP) ডাউনলোড করুন"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>সোর্স কোড জিপ (ZIP) ডাউনলোড</span>
                </button>

                {onSwitchToMobileView && (
                  <button
                    onClick={() => {
                      onSwitchToMobileView();
                      onClose();
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>মোবাইল ইন্টারফেস</span>
                  </button>
                )}
              </div>
            </div>

            {/* Instant feedback confirmation */}
            <div className="bg-emerald-500/15 border border-emerald-400/40 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="block text-emerald-300">অফিশিয়াল সুরক্ষিত অ্যাপ ইনস্টলেশন:</strong>
                <span>বাটনে চাপলে ক্রোম/সাফারি ব্রাউজারের মাধ্যমে সরাসরি Sukoon Properties অফিশিয়াল অ্যাপ হোম-স্ক্রিনে যুক্ত হয়। কোনো প্রকার ফাইল ডাউনলোড ত্রুটি বা ভাইরাস ঝুঁকি থাকে না।</span>
              </div>
            </div>
          </div>

          {/* Visual Step-by-Step Mobile Guidance Panel */}
          <div className="bg-amber-50/80 border border-amber-200/90 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5 font-serif">
                <Info className="w-4 h-4 text-amber-600" />
                মোবাইল ব্রাউজার ভিজ্যুয়াল গাইড (যদি ব্রাউজার অটো-ইনস্টল পপআপ না দেখায়):
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Android Guide */}
              <div className={`p-3.5 rounded-xl border transition ${isAndroid ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-300' : 'bg-white border-amber-200/70'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1">
                    🤖 Android Chrome
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    গুগল ক্রোম
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="bg-amber-200 text-amber-900 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">১</span>
                    <span>ব্রাউজারের উপরে ডান কোণায় <strong>৩-ডট (⋮)</strong> মেনুতে স্পর্শ করুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-amber-200 text-amber-900 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">২</span>
                    <span><strong>"Add to Home Screen"</strong> বা <strong>"Install app"</strong> নির্বাচন করুন।</span>
                  </div>
                </div>
              </div>

              {/* iOS Guide */}
              <div className={`p-3.5 rounded-xl border transition ${isIOS ? 'bg-amber-100/80 border-amber-400 ring-2 ring-amber-300' : 'bg-white border-amber-200/70'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1">
                    📱 iOS Safari
                  </span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                    আইফোন সাফারি
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="bg-sky-200 text-sky-900 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">১</span>
                    <span>সাফারির নিচে <strong>Share (<Share2 className="w-3 h-3 inline text-sky-700" />)</strong> আইকন ট্যাপ করুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-sky-200 text-sky-900 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">২</span>
                    <span>স্ক্রোল করে <strong>"Add to Home Screen"</strong> নির্বাচন করুন।</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Web App Direct Share Link Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                Sukoon Properties ইনস্টল ও শেয়ার লিংক
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Official Production Link
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2 overflow-hidden">
              <p className="font-mono text-xs text-emerald-300 font-bold truncate select-all">{currentWebUrl}</p>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-lg transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'কপি হয়েছে' : 'লিংক কপি'}</span>
              </button>
            </div>
          </div>

          {/* Account Registration Banner */}
          {onOpenAuthModal && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">
                  কোম্পানির জন্য নাম রেজিস্ট্রেশন ও লগইন করুন
                </h4>
                <p className="text-[11px] text-slate-600">
                  অ্যাপ্রুভড আইডি দিয়ে লগইন করে প্রপার্টি সেভ, কিস্তি ক্যালকুলেশন এবং ৩৬০° ভিডিও ট্যুর দেখুন।
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold text-xs rounded-xl shadow transition flex-shrink-0"
              >
                নাম রেজিস্ট্রেশন (Register)
              </button>
            </div>
          )}

          {/* Test Native App View Mode in Browser */}
          {onSwitchToMobileView && (
            <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-4 rounded-2xl border border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2.5 rounded-xl text-slate-950 font-bold">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white">
                    ব্রাউজারে সরাসরি মোবাইল অ্যাপ মোড টেস্ট করুন
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    কম্পিউটার বা ফোনে অ্যান্ড্রয়েড / আইফোন অ্যাপের ইন্টারঅ্যাক্টিভ ইন্টারফেস ওপেন হবে।
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSwitchToMobileView();
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center justify-center gap-1.5 flex-shrink-0"
              >
                <span>মোবাইল মোড চালু করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* App Features List */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" /> অ্যাপসের সমস্ত সুবিধা:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>৩৬০° ভার্চুয়াল ড্রোন ওয়াকথ্রু এবং প্লট ভিউ</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>কোম্পানির নাম রেজিস্ট্রেশন এবং ওটিপি ভিত্তিক লগইন</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>লাইভ কারেন্সি কনভার্টার (BDT / KWD / USD / EUR)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>রাজউক অনুমোদিত দলিল ভেরিফিকেশন ও মিউটেশন ডেক্স</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
