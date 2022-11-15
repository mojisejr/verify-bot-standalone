module.exports = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "itemType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "itemAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "acceptedTokenType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "acceptedTokenAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenAmount",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct FreeCityMarket.OrderBook",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cancelledAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "soldAt",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct FreeCityMarket.OrderBookMeta",
        name: "meta",
        type: "tuple",
      },
    ],
    name: "Cancel",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "itemType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "itemAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "acceptedTokenType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "acceptedTokenAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenAmount",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct FreeCityMarket.OrderBook",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cancelledAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "soldAt",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct FreeCityMarket.OrderBookMeta",
        name: "meta",
        type: "tuple",
      },
    ],
    name: "Created",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "itemType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "itemAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "acceptedTokenType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "acceptedTokenAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenAmount",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct FreeCityMarket.OrderBook",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cancelledAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "soldAt",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct FreeCityMarket.OrderBookMeta",
        name: "meta",
        type: "tuple",
      },
    ],
    name: "Sold",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "availableOrder",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "cancel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
    ],
    name: "checkRoyalties",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        internalType: "enum FreeCityMarket.TokenType",
        name: "tokenType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "itemAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acceptedTokenId",
        type: "uint256",
      },
      {
        internalType: "enum FreeCityMarket.TokenType",
        name: "acceptedTokenType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "acceptedTokenAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "acceptedTokenAmount",
        type: "uint256",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getOrderInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "itemType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "itemAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "itemAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenId",
            type: "uint256",
          },
          {
            internalType: "enum FreeCityMarket.TokenType",
            name: "acceptedTokenType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "acceptedTokenAddr",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "acceptedTokenAmount",
            type: "uint256",
          },
        ],
        internalType: "struct FreeCityMarket.OrderBook",
        name: "order",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cancelledAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "soldAt",
            type: "uint256",
          },
        ],
        internalType: "struct FreeCityMarket.OrderBookMeta",
        name: "meta",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeProvider",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "metas",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cancelledAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "soldAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orders",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "enum FreeCityMarket.Status",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        internalType: "enum FreeCityMarket.TokenType",
        name: "itemType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "itemAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "itemAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acceptedTokenId",
        type: "uint256",
      },
      {
        internalType: "enum FreeCityMarket.TokenType",
        name: "acceptedTokenType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "acceptedTokenAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "acceptedTokenAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "sellerBooks",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setEnableERC2981",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setEnableMaxFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feeProvider",
        type: "address",
      },
    ],
    name: "setFeeProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMaxFee",
        type: "uint256",
      },
    ],
    name: "setMaxFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
