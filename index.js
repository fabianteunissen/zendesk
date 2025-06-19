const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// Middleware endpoint voor Zendesk
app.get('/api/orderinfo', async (req, res) => {
  const orderNumber = req.query.orderNumber;
  
  if (!orderNumber) {
    return res.status(400).json({ error: 'orderNumber is verplicht' });
  }

  // Simulatie van Channable + BC data
  const channableData = {
    source: 'Bol.com',
    externalOrderId: orderNumber,
  };

  const bcData = {
    bcOrderId: 'SO-100842',
    status: 'Verzonden op 2025-06-18',
    trackAndTrace: {
      carrier: 'PostNL',
      code: '3SYZ12345678',
      url: 'https://postnl.nl/tracktrace/?B=3SYZ12345678&P=1234AB&D=NL'
    },
    customer: {
      name: 'Jan Jansen',
      email: 'jan@example.com'
    },
    product: {
      title: 'Ergonomisch Zitkussen Zwart',
      ean: '8711234567890',
      sku: 'KUS-ZIT-ZW'
    }
  };

  res.json({
    ...channableData,
    ...bcData
  });
});

app.listen(port, () => {
  console.log(`Middleware draait op poort ${port}`);
});
