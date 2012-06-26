// sublime: tab_size 2; translate_tabs_to_spaces true

module.exports = function (app, magento, url, magento_confs, sync_shops_confs) {

  var   fs = require('fs')
      , sync_shop = require('../sync_shop_funcs.js')
      , product = {}
      , error = {}
      , render_parameter = sync_shop.render_parameter
      ;

  // error.e408 = function (req, res) {
  //   res.render('408', render_parameter);
  // }

  function index(req, res) {
    res.render('sync_shop_index', render_parameter);
  };

  product.index = function(req, res) {
    res.render('sync_shop_product_index', render_parameter);
  };


  //ladet die Seite sobald sie erhältlich ist
  product.info = function(req, res) {
    if (req.query['sku']) {
      var type = 'SKU';
      sync_shop.parse_info_filter(req.query['sku'], function(url_string){
        sync_shop.get_products(url_string, function(data){
          sync_shop.set_render_parameter(data, function(parameter){
            if (data.ROWCOUNT>0)
              res.render('product_attributes', parameter);
            else
              res.render('no_product_with_menu', parameter);
          });
        });
      });
    } else {
      console.log('no sku given!');
      product.index(req, res);
    }
  };
  //ladet die infos mittels dnode nach sobald sie erhältlich sind, zeigt solange ein loader an
  product.info_load = function(req, res) {
    if (req.query['sku']) {
      var type = 'SKU';
      sync_shop.parse_info_filter(req.query['sku'], function(url_string){
        var parameter = render_parameter;
            parameter.get_product_url = url_string; 
        res.render('sync_shop_product_attributes_load', parameter);
      });
    } else {
      console.log('no sku given!');
      product.index(req, res);
    }
  };

  return {
    request: {
        product: product
      , index: index

    },
    dnode: {

    }
  }

}
