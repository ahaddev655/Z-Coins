import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    const uid = localStorage.getItem("uid");

    const timer = setTimeout(() => {
      if (id && uid) {
        navigate("/u/");
      } else {
        navigate("/auth");
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-[#fafafa] overflow-hidden">
      {/* --- Background Aesthetic --- */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        {/* Soft Blue Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-100/40 rounded-full blur-[120px]" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-blue-950 flex items-center gap-1">
            {"Z-COINS".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4 text-[10px] uppercase tracking-[0.3em] font-semibold text-blue-900/60"
          >
            Secure • Fast • Modern Crypto
          </motion.p>
        </motion.div>

        {/* Sleek Progress Bar */}
        <div className="mt-12 w-48 h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-blue-900"
          />
        </div>
      </div>

      {/* --- Footer --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Enterprise Grade Security
        </p>
        <div className="h-4 w-px bg-gray-300" />
        <p className="text-[11px] text-gray-500 font-medium">
          © {new Date().getFullYear()} Z-Coins Corporation
        </p>
      </motion.div>
    </div>
  );
}

export default SplashScreen;
