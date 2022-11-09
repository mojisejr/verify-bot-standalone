module.exports = {
  slashCommand: {
    verify: {
      name: "draca",
      message: {
        description: "ถ้ามี Dig dragon ในกระเป๋าก็ลุยได้เลย!",
        walletDefinition: "เลขกระเป๋า ที่มี Dig dragon อยู่ในนั้น",
      },
    },
    reverify: {
      name: "reverify",
      message: {
        description:
          "เพื่อนๆ สามารถ reverify กระเป๋า (เปลี่ยนกระเป๋า) ด้วยคำสั่งนี้",
        oldWalletDefinition: "กระเป๋าเดิมที่มา verify ไว้",
        newWalletDefinition: "กระเป๋าใบใหม่ที่มี Dig dragon ที่จะเปลี่ยน",
      },
    },
  },
  verification: {
    messages: {
      verified: "ยินดีตอนรับ Draca Digger! ⛏",
      comeback: "ยินดีตอนรับกลับมา Draca Digger ! ⛏",
      already: "คุณ verify แล้ว 🦦",
      notFound: "ตรวจสอบไม่พบ !!",
    },
  },

  remoteDatabase: {
    newHolder: "/holder/new",
    updateHolder: "/holder/update",
    url: "http://157.245.152.83:3003/v1"
  },
};
