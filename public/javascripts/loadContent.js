// sublime: tab_size 2; translate_tabs_to_spaces true


var get = {
  index:
    function(cb) {
      DNode.connect(function (remote) {
        remote.routes.index(cb);
      })
    }
  ,loading:
    function(cb) {
      DNode.connect(function (remote) {
        remote.routes.loading(cb);
      })
    }
  ,magento: {
    product: {
      index: 
        function(cb) {
          DNode.connect(function (remote) {
            remote.routes.index(cb);
          })
        }
      , list:
        function (filter_type, input, shop, storeView, cb) {
          DNode.connect(function (remote) {
            remote.routes.product.list(filter_type, input, shop, storeView, cb);
          })
        }
      , info: 
        function (id_or_sku, shop, storeView, cb) {
          DNode.connect(function (remote) {
            remote.routes.product.info(id_or_sku, shop, storeView, cb);
          })
        }
    }
    , category: {
      index: 
        function(cb) {
          DNode.connect(function (remote) {
            remote.routes.category.index(cb);
          })
        }
    }
  }
  ,json_shop: {
    product: {
      info: function (get_product_url, cb) {
        DNode.connect(function (remote) {
          remote.routes.sync_shop.product.info(get_product_url, cb);
        })
      },
      info_by_sku: function(sku, cb) {
        DNode.connect(function (remote) {
          remote.routes.sync_shop.product.info_by_sku(sku, cb);
        })
      }
    },
    partnums: {
      index: function(cb) {
        DNode.connect(function (remote) {
          remote.routes.sync_shop.partnums.index(cb);
        }) 
      }
    }
  }
}

function loadStatic(content) {
	switch (content) {
	case 'index':
		
		break;
	case 'product_index':
		DNode.connect(function (remote) {
			remote.routes.product.index(function (html) {
				$('.span10').html(html);
			});
		});
		break;
	case 'category_index':
		DNode.connect(function (remote) {
			remote.routes.category.index(function (html) {
				$('.span10').html(html);
			});
		});
		break;
	case 'loading':
		DNode.connect(function (remote) {
			remote.routes.loading(function (html) {
				$('.span10').html(html);
			});
		});
		break;
	}
}
function loadProducts(filter_type, input, shop, storeView) {
  DNode.connect(function (remote) {
    remote.routes.product.list(filter_type, input, shop, storeView, function (html) {
      $('.span10').html(html);
    });
  });
}
function loadMagentoShopProductAttributes(id_or_sku, shop, storeView, cb) {
  DNode.connect(function (remote) {
    remote.routes.product.info(id_or_sku, shop, storeView, cb);
  });
}

function loadSyncShopProductAttributes(get_product_url) {
  DNode.connect(function (remote) {
    remote.routes.sync_shop.product.info(get_product_url, function (html) {
      $('.span10').html(html);
    });
  });
}
function loadSyncShopProductAttributesBySKU(sku, cb) {
  DNode.connect(function (remote) {
    remote.routes.sync_shop.product.info.sku(sku, cb);
  });
}