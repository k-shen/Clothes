//
//  ViewController.swift
//  Clothes
//
//  Created by Kaiwen Shen on 6/19/19.
//  Copyright © 2019 Kaiwen Shen. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    var tempF: Int = 0
    override func viewDidLoad() {
        super.viewDidLoad()
            //Looks for single or multiple taps.
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
            
            //Uncomment the line below if you want the tap not not interfere and cancel other interactions.
            //tap.cancelsTouchesInView = false
            
        view.addGestureRecognizer(tap)
    }

    var highTemp:Int
    var lowTemp:Int

    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }
    
    
    @IBOutlet weak var highTempInput: UITextField!
    
    @IBOutlet weak var lowTempInput: UITextField!
    
    @IBAction func GObtn(_ sender: Any) {
        if !highTempInput.hasText || !lowTempInput.hasText {
            
        }
        
        
    }
    
    
}

